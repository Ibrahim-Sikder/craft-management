/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

// Sample student data
const initialStudentsData = [
  { id: 1, name: "আহমেদ রফিক", date: dayjs(), month: "জানুয়ারী" }
];

export default function AddClassReportTarget() {
  const theme = useTheme();
  const [students, setStudents] = useState(initialStudentsData);

  const updateStudent = (id: any, field: any, value: any) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        p={3}
        sx={{
          maxWidth: "xl",
          margin: "0 auto",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
        }}
      >
        {/* Header section */}
        <Paper elevation={4} sx={{ p: 3, mb: 3, background: "#fff" }}>
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: theme.palette.primary.main,
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            ক্রাফট ইন্টারন্যাশনাল ইন্সটিটিউট
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              mb: 3,
              color: theme.palette.text.secondary,
              fontStyle: "italic",
            }}
          >
            কাওসার ও নুরানী ছাত্রদের সাপ্তাহিক রিপোর্ট
          </Typography>
        </Paper>

        {students.map((student) => (
          <Paper
            key={student.id}
            elevation={4}
            sx={{ p: 3, mb: 3, background: "#fff" }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              শিক্ষার্থী #{student.id}
            </Typography>

            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <TextField
                label="শিক্ষার্থীর নাম"
                variant="outlined"
                size="small"
                value={student.name}
                onChange={(e) =>
                  updateStudent(student.id, "name", e.target.value)
                }
                sx={{ mb: 2, minWidth: 120, flexGrow: 1, mr: 1 }}
              />
              <DatePicker
                label="তারিখ"
                value={student.date}
                onChange={(newValue) =>
                  updateStudent(student.id, "date", newValue)
                }
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { mb: 2, minWidth: 120, flexGrow: 1, mr: 1 },
                  },
                }}
              />
              <TextField
                label="মাস"
                variant="outlined"
                size="small"
                value={student.month}
                onChange={(e) =>
                  updateStudent(student.id, "month", e.target.value)
                }
                sx={{ mb: 2, minWidth: 120, flexGrow: 1 }}
              />
            </Box>

            {/* Table Section */}
            <Paper
              elevation={4}
              sx={{ border: "2px solid #1976d2", overflow: "hidden" }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        background:
                          "linear-gradient(45deg, #1976d2 0%, #42a5f5 100%)",
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #fff",
                          fontWeight: "bold",
                          color: "white",
                          fontSize: "1.1rem",
                        }}
                      >
                        এককজরে এই সপ্তাহের টার্গেট
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #fff",
                          fontWeight: "bold",
                          color: "white",
                          fontSize: "1.1rem",
                        }}
                      >
                        হাদিস নম্বর / সূরার নাম
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #fff",
                          fontWeight: "bold",
                          color: "white",
                          fontSize: "1.1rem",
                        }}
                      >
                        দোয়ার নম্বর
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #fff",
                          fontWeight: "bold",
                          color: "white",
                          fontSize: "1.1rem",
                        }}
                      >
                        তাজবীদের বিষয়
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid #fff",
                          fontWeight: "bold",
                          color: "white",
                          fontSize: "1.1rem",
                        }}
                      >
                        কাজের (শ:)
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* Row 1 */}
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #ccc",
                          fontWeight: "bold",
                          background: "#e3f2fd",
                        }}
                      >
                        এককজরে এই সপ্তাহের টার্গেট
                      </TableCell>
                      {[0, 1, 2, 3].map((index) => (
                        <TableCell
                          key={index}
                          sx={{ border: "1px solid #ccc", p: 0.5 }}
                        >
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: { borderRadius: 0, background: "#fff" },
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* Row 2 */}
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #ccc",
                          fontWeight: "bold",
                          background: "#e3f2fd",
                        }}
                      >
                        এককজরে এই সপ্তাহের রিপোর্ট
                      </TableCell>
                      {[0, 1, 2, 3].map((index) => (
                        <TableCell
                          key={index}
                          sx={{ border: "1px solid #ccc", p: 0.5 }}
                        >
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: { borderRadius: 0, background: "#fff" },
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* Row 3 */}
                    <TableRow>
                      <TableCell
                        sx={{
                          border: "1px solid #ccc",
                          fontWeight: "bold",
                          background: "#e3f2fd",
                        }}
                      >
                        এককজরে ভুলের সংখ্যা
                      </TableCell>
                      {[0, 1, 2, 3].map((index) => (
                        <TableCell
                          key={index}
                          sx={{ border: "1px solid #ccc", p: 0.5 }}
                        >
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            InputProps={{
                              sx: { borderRadius: 0, background: "#fff" },
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Paper>
        ))}
      </Box>
    </LocalizationProvider>
  );
}