/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {
  Box,
  Typography,
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
  alpha,
  useTheme,
  Paper,
  Tooltip,
  IconButton,
  Chip,
  Fade,
} from "@mui/material"
import { Download, Schedule, Edit, Add, Info, Room, AccessTime } from "@mui/icons-material"
import { teacherData } from "./TeacherProfile"


const TeacherSchedule = () => {
  const theme = useTheme()

  return (
    <Fade in={true} timeout={500}>
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
              <Schedule sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Weekly Teaching Schedule
              </Typography>
            </Box>
          }
          action={
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                startIcon={<Add />}
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
                Add Class
              </Button>
              <Button
                startIcon={<Download />}
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
                Export Schedule
              </Button>
            </Box>
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
                  <TableCell width="15%" sx={{ pl: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTime sx={{ mr: 1, fontSize: 18 }} />
                      Time
                    </Box>
                  </TableCell>
                  {teacherData.teachingSchedule.map((day) => (
                    <TableCell key={day.day} align="center">
                      {day.day}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {["9:00 AM - 10:30 AM", "11:00 AM - 12:30 PM", "1:00 PM - 2:30 PM"].map((timeSlot, timeIndex) => (
                  <TableRow
                    key={timeSlot}
                    hover
                    sx={{
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.light, 0.05),
                      },
                    }}
                  >
                    <TableCell sx={{ pl: 3, fontWeight: "medium" }}>{timeSlot}</TableCell>
                    {teacherData.teachingSchedule.map((day, dayIndex) => {
                      const period = day.periods.find((p) => p.time === timeSlot)
                      return (
                        <TableCell key={`${day.day}-${timeSlot}`} align="center" sx={{ p: 1 }}>
                          {period ? (
                            <Paper
                              elevation={0}
                              sx={{
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: period.class.includes("Office Hours")
                                  ? alpha(theme.palette.info.light, 0.2)
                                  : period.class.includes("Planning") ||
                                      period.class.includes("Meeting") ||
                                      period.class.includes("Development") ||
                                      period.class.includes("Research") ||
                                      period.class.includes("Mentoring") ||
                                      period.class.includes("Faculty") ||
                                      period.class.includes("Supervision")
                                    ? alpha(theme.palette.warning.light, 0.2)
                                    : alpha(theme.palette.primary.light, 0.2),
                                border: `1px solid ${
                                  period.class.includes("Office Hours")
                                    ? alpha(theme.palette.info.main, 0.3)
                                    : period.class.includes("Planning") ||
                                        period.class.includes("Meeting") ||
                                        period.class.includes("Development") ||
                                        period.class.includes("Research") ||
                                        period.class.includes("Mentoring") ||
                                        period.class.includes("Faculty") ||
                                        period.class.includes("Supervision")
                                      ? alpha(theme.palette.warning.main, 0.3)
                                      : alpha(theme.palette.primary.main, 0.3)
                                }`,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform: "translateY(-3px)",
                                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
                                  bgcolor: period.class.includes("Office Hours")
                                    ? alpha(theme.palette.info.light, 0.3)
                                    : period.class.includes("Planning") ||
                                        period.class.includes("Meeting") ||
                                        period.class.includes("Development") ||
                                        period.class.includes("Research") ||
                                        period.class.includes("Mentoring") ||
                                        period.class.includes("Faculty") ||
                                        period.class.includes("Supervision")
                                      ? alpha(theme.palette.warning.light, 0.3)
                                      : alpha(theme.palette.primary.light, 0.3),
                                },
                              }}
                            >
                              <Typography variant="body1" fontWeight="medium">
                                {period.class}
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                <Room sx={{ fontSize: 16, mr: 0.5, color: theme.palette.text.secondary }} />
                                <Typography variant="body2" color="text.secondary">
                                  Room {period.room}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
                                <Tooltip title="View Details">
                                  <IconButton
                                    size="small"
                                    sx={{
                                      color: theme.palette.primary.main,
                                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                                      "&:hover": {
                                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                                      },
                                    }}
                                  >
                                    <Info fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                  <IconButton
                                    size="small"
                                    sx={{
                                      color: theme.palette.warning.main,
                                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                                      "&:hover": {
                                        bgcolor: alpha(theme.palette.warning.main, 0.2),
                                      },
                                    }}
                                  >
                                    <Edit fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Paper>
                          ) : (
                            <Chip
                              label="Free Period"
                              variant="outlined"
                              size="small"
                              color="default"
                              sx={{
                                borderRadius: 1,
                                bgcolor: alpha(theme.palette.success.light, 0.1),
                                borderColor: alpha(theme.palette.success.main, 0.3),
                                color: theme.palette.success.dark,
                                "&:hover": {
                                  bgcolor: alpha(theme.palette.success.light, 0.2),
                                },
                              }}
                            />
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Legend */}
          <Box sx={{ display: "flex", gap: 2, p: 2, flexWrap: "wrap", justifyContent: "center" }}>
            <Chip
              label="Class"
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.light, 0.2),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                color: theme.palette.primary.dark,
              }}
            />
            <Chip
              label="Office Hours"
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.info.light, 0.2),
                border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                color: theme.palette.info.dark,
              }}
            />
            <Chip
              label="Meetings & Planning"
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.warning.light, 0.2),
                border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                color: theme.palette.warning.dark,
              }}
            />
            <Chip
              label="Free Period"
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.success.light, 0.1),
                border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                color: theme.palette.success.dark,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Fade>
  )
}

export default TeacherSchedule
