import React from "react"
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

  ListItemAvatar,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
  useTheme,
  Box,
  Paper,
  IconButton,
  Tooltip,
  Fade
} from "@mui/material"
import {
  Notifications,
  Add,
  Warning,
  Info,
  Assignment,
  PriorityHigh,
  CheckCircle,
  Edit,
  Delete,
  Visibility,
  CalendarMonth,
  People
} from "@mui/icons-material"
import { teacherData } from "./TeacherProfile"


const AssignmentGrading = () => {
  const theme = useTheme()
  
  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>
        {/* Pending Grading */}
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
                  <Assignment sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">Pending Assignments to Grade</Typography>
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
                  Add Assignment
                </Button>
              }
            />
            <CardContent sx={{ p: 0 }}>
              <TableContainer sx={{
            overflowX: "auto",  
            WebkitOverflowScrolling: "touch",  
            maxWidth: "100vw"  
          }}>
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
                      <TableCell>Assignment</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Submissions</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teacherData.pendingGrading.map((assignment, index) => (
                      <TableRow 
                        key={index} 
                        hover 
                        sx={{ 
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.light, 0.05),
                          }
                        }}
                      >
                        <TableCell>
                          <Typography variant="body1" fontWeight="medium">
                            {assignment.assignment}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={assignment.class} 
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
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarMonth fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
                            <Typography variant="body2">{assignment.dueDate}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<People fontSize="small" />}
                            label={`${assignment.submissions} submissions`}
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
                          <Chip 
                            label="Pending" 
                            size="small" 
                            color="warning" 
                            icon={<Warning fontSize="small" />} 
                            sx={{ 
                              fontWeight: 'medium',
                              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1, justifyContent: 'center' }}>
                            <Button 
                              variant="contained" 
                              size="small" 
                              color="primary"
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
                              Grade Now
                            </Button>
                            <Tooltip title="View Details">
                              <IconButton 
                                size="small" 
                                sx={{ 
                                  color: theme.palette.info.main,
                                  bgcolor: alpha(theme.palette.info.main, 0.1),
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.info.main, 0.2),
                                    transform: 'translateY(-2px)'
                                  }
                                }}
                              >
                                <Visibility fontSize="small" />
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

        {/* Pending Tasks */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              height: '100%',
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
                  <PriorityHigh sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">Pending Tasks</Typography>
                </Box>
              }
            />
            <CardContent>
              <List>
                {teacherData.pendingTasks.map((task, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      py: 2,
                      px: 2,
                      mb: 2,
                      borderRadius: 3,
                      bgcolor: alpha(
                        task.priority === "High"
                          ? theme.palette.error.main
                          : task.priority === "Medium"
                            ? theme.palette.warning.main
                            : theme.palette.info.main,
                        0.1
                      ),
                      border: `1px solid ${alpha(
                        task.priority === "High"
                          ? theme.palette.error.main
                          : task.priority === "Medium"
                            ? theme.palette.warning.main
                            : theme.palette.info.main,
                        0.3
                      )}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <ListItemIcon sx={{ mt: 0, minWidth: 40 }}>
                        {task.priority === "High" ? (
                          <Avatar sx={{ bgcolor: theme.palette.error.main, width: 36, height: 36 }}>
                            <Warning />
                          </Avatar>
                        ) : task.priority === "Medium" ? (
                          <Avatar sx={{ bgcolor: theme.palette.warning.main, width: 36, height: 36 }}>
                            <Warning />
                          </Avatar>
                        ) : (
                          <Avatar sx={{ bgcolor: theme.palette.info.main, width: 36, height: 36 }}>
                            <Info />
                          </Avatar>
                        )}
                      </ListItemIcon>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                          {task.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <CalendarMonth fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
                          <Typography variant="body2" color="text.secondary">
                            Due: {task.deadline}
                          </Typography>
                          <Chip 
                            label={task.priority} 
                            size="small" 
                            sx={{ 
                              ml: 1,
                              bgcolor: alpha(
                                task.priority === "High"
                                  ? theme.palette.error.main
                                  : task.priority === "Medium"
                                    ? theme.palette.warning.main
                                    : theme.palette.info.main,
                                0.2),
                                color: task.priority === "High"
                                  ? theme.palette.error.dark
                                  : task.priority === "Medium"
                                    ? theme.palette.warning.dark
                                    : theme.palette.info.dark,
                                fontWeight: 'medium'
                              }}
                            />
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                        <Tooltip title="Mark as Complete">
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: theme.palette.success.main,
                              bgcolor: alpha(theme.palette.success.main, 0.1),
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.success.main, 0.2),
                              }
                            }}
                          >
                            <CheckCircle fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Task">
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: theme.palette.warning.main,
                              bgcolor: alpha(theme.palette.warning.main, 0.1),
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.warning.main, 0.2),
                              }
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Announcements */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              height: '100%',
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
                  <Notifications sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">Recent Announcements</Typography>
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
                  New Announcement
                </Button>
              }
            />
            <CardContent>
              <List>
                {teacherData.recentAnnouncements.map((announcement, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      py: 2,
                      px: 2,
                      mb: 2,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                        bgcolor: alpha(theme.palette.primary.light, 0.15),
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: theme.palette.primary.main,
                            width: 48,
                            height: 48,
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <Notifications />
                        </Avatar>
                      </ListItemAvatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                          {announcement.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {announcement.date}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {announcement.content}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                        <Tooltip title="Edit Announcement">
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: theme.palette.warning.main,
                              bgcolor: alpha(theme.palette.warning.main, 0.1),
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.warning.main, 0.2),
                              }
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Announcement">
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: theme.palette.error.main,
                              bgcolor: alpha(theme.palette.error.main, 0.1),
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.error.main, 0.2),
                              }
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  )
}

export default AssignmentGrading
