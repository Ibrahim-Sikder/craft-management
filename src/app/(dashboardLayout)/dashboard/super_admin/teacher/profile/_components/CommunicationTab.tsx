import React from "react"
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  alpha,
  Paper,
  IconButton,
  Tooltip,
  Fade
} from "@mui/material"
import {
  People,
  Message,
  Notifications,
  Add,
  MarkEmailRead,
  Reply,
  Delete,
  Visibility,
  CalendarMonth,
  Email
} from "@mui/icons-material"
import { teacherData } from "./TeacherOverview"


const CommunicationTab = () => {
  const theme = useTheme()
  
  return (
    <Fade in={true} timeout={500}>
      <Grid container spacing={4}>
        {/* Messages */}
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
                  <Email sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">Recent Messages</Typography>
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
                  Compose Message
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
                      <TableCell>From</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teacherData.recentMessages.map((message, index) => (
                      <TableRow
                        key={index}
                        hover
                        sx={{
                          bgcolor: message.read ? "inherit" : alpha(theme.palette.primary.light, 0.05),
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: message.read ? alpha(theme.palette.primary.light, 0.03) : alpha(theme.palette.primary.light, 0.08),
                          }
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              sx={{ 
                                mr: 1.5, 
                                bgcolor: message.read ? theme.palette.grey[400] : theme.palette.primary.main,
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                              }}
                            >
                              {message.from.charAt(0)}
                            </Avatar>
                            <Typography variant="body1" fontWeight={message.read ? "regular" : "medium"}>
                              {message.from}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" fontWeight={message.read ? "regular" : "medium"}>
                            {message.subject}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarMonth fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
                            <Typography variant="body2">{message.date}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {message.read ? (
                            <Chip 
                              label="Read" 
                              size="small" 
                              color="default" 
                              variant="outlined" 
                              sx={{ fontWeight: 'medium' }}
                            />
                          ) : (
                            <Chip 
                              label="Unread" 
                              size="small" 
                              color="primary" 
                              sx={{ fontWeight: 'medium' }}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 1, justifyContent: 'center' }}>
                            <Tooltip title="Read Message">
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
                            <Tooltip title="Reply">
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
                                <Reply fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Mark as Read">
                              <IconButton 
                                size="small" 
                                sx={{ 
                                  color: theme.palette.success.main,
                                  bgcolor: alpha(theme.palette.success.main, 0.1),
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.success.main, 0.2),
                                    transform: 'translateY(-2px)'
                                  }
                                }}
                              >
                                <MarkEmailRead fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
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

        {/* Communication Tools */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  overflow: 'hidden',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: theme.palette.primary.main,
                      mx: "auto",
                      mb: 3,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <People fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Parent-Teacher Meetings
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                    Schedule and manage parent-teacher conferences and meetings
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    sx={{ 
                      borderRadius: 2,
                      py: 1.2,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                  >
                    Schedule Meeting
                  </Button>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                  bgcolor: alpha(theme.palette.warning.main, 0.05),
                  overflow: 'hidden',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: theme.palette.warning.main,
                      mx: "auto",
                      mb: 3,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Notifications fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Class Announcements
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                    Send important announcements to students and parents
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ 
                      bgcolor: theme.palette.warning.main, 
                      "&:hover": { bgcolor: theme.palette.warning.dark },
                      borderRadius: 2,
                      py: 1.2,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s ease',
                      // '&:hover': {
                      //   transform: 'translateY(-2px)',
                      //   boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                      //   bgcolor: theme.palette.warning.dark
                      // }
                    }}
                    fullWidth
                  >
                    Create Announcement
                  </Button>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  bgcolor: alpha(theme.palette.success.main, 0.05),
                  overflow: 'hidden',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: theme.palette.success.main,
                      mx: "auto",
                      mb: 3,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Message fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Direct Messaging
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                    Send private messages to students, parents, or colleagues
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ 
                      bgcolor: theme.palette.success.main, 
                      "&:hover": { bgcolor: theme.palette.success.dark },
                      borderRadius: 2,
                      py: 1.2,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s ease',
                      // '&:hover': {
                      //   transform: 'translateY(-2px)',
                      //   boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                      //   bgcolor: theme.palette.success.dark
                      // }
                    }}
                    fullWidth
                  >
                    Send Message
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

export default CommunicationTab
