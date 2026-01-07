/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useBulkRetainEnrollmentsMutation,
  useGetPromotionEligibleStudentsQuery,
} from "@/redux/api/promotionApi";
import { Close, School, Search, RestartAlt } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface ClassOption {
  value: string;
  label: string;
}

interface RetainModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  classOptions: ClassOption[];
}

const RetainModal: React.FC<RetainModalProps> = ({
  open,
  onClose,
  onSuccess,
  classOptions,
}) => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [sourceClassId, setSourceClassId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [rollNumbers, setRollNumbers] = useState<Record<string, string>>({});
  const [sections, setSections] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const [bulkRetain, { isLoading: retaining }] =
    useBulkRetainEnrollmentsMutation();

  const {
    data: eligibleData,
    isLoading: loadingEligible,
    isFetching,
  } = useGetPromotionEligibleStudentsQuery(sourceClassId, {
    skip: !sourceClassId,
  });

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eligibleStudents = eligibleData?.data?.students || [];
    if (event.target.checked) {
      setSelectedStudents(eligibleStudents.map((s: any) => s.studentId));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleRollNumberChange = (studentId: string, value: string) => {
    setRollNumbers((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSectionChange = (studentId: string, value: string) => {
    setSections((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleRetain = async () => {
    onClose();
    if (selectedStudents.length === 0) {
      Swal.fire("No Selection", "Please select students to retain.", "warning");
      return;
    }

    Swal.fire({
      title: "Confirm Retention",
      html: `Retain <strong>${selectedStudents.length}</strong> student(s) in current class for new session?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      confirmButtonText: "Yes, Retain",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);

          const promotions = selectedStudents.map((studentId) => {
            const studentData = eligibleData?.data?.students.find(
              (s: any) => s.studentId === studentId
            );

            return {
              studentId: studentData.studentId,
              rollNumber:
                rollNumbers[studentId] || studentData.currentRoll || "",
              section: sections[studentId] || studentData.section || "A",
            };
          });
          await bulkRetain({ promotions }).unwrap();

          await Swal.fire({
            title: "Success!",
            text: "Students retained successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          setSelectedStudents([]);
          setRollNumbers({});
          setSections({});
          setSourceClassId("");
          setSearchTerm("");
          onClose();
          if (onSuccess) onSuccess();
        } catch (error: any) {
          console.error("Retention error:", error);
          Swal.fire({
            title: "Error",
            text: error.data?.message || "Failed to retain students",
            icon: "error",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const filteredStudents = React.useMemo(() => {
    const students = eligibleData?.data?.students || [];
    if (!searchTerm.trim()) return students;
    const term = searchTerm.toLowerCase();
    return students.filter(
      (s: any) =>
        s.studentName.toLowerCase().includes(term) ||
        s.studentIdentifier.toLowerCase().includes(term)
    );
  }, [eligibleData, searchTerm]);

  const handleClose = () => {
    setSelectedStudents([]);
    setRollNumbers({});
    setSections({});
    setSourceClassId("");
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" display="flex" alignItems="center" gap={1}>
            <RestartAlt /> Retain Students (Same Class)
          </Typography>
          <IconButton onClick={handleClose} disabled={retaining || loading}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Class</InputLabel>
              <Select
                value={sourceClassId}
                label="Select Class"
                onChange={(e) => setSourceClassId(e.target.value)}
                disabled={retaining || loading}
              >
                {classOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {eligibleData?.data && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ ml: 1, mt: 1 }}
              >
                Found: {eligibleData?.data?.students?.length} active students
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              Retained students will stay in the <strong>same class</strong> for
              the next session. Their previous enrollment will be marked as
              Failed.
            </Alert>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search Students"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={!sourceClassId || retaining || loading}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ maxHeight: 400, overflow: "auto" }}>
              {loadingEligible && sourceClassId ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <CircularProgress />
                  <Typography sx={{ mt: 2 }}>Loading students...</Typography>
                </Box>
              ) : !sourceClassId ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <School
                    sx={{ fontSize: 40, color: "text.disabled", mb: 2 }}
                  />
                  <Typography>
                    Please select a Class to view students.
                  </Typography>
                </Box>
              ) : filteredStudents.length === 0 ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography>No students found in this class.</Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={
                              selectedStudents.length > 0 &&
                              selectedStudents.length < filteredStudents.length
                            }
                            checked={
                              filteredStudents.length > 0 &&
                              selectedStudents.length ===
                                filteredStudents.length
                            }
                            onChange={handleSelectAll}
                            disabled={retaining || loading}
                          />
                        </TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>Current Roll</TableCell>
                        <TableCell>New Roll</TableCell>
                        <TableCell>Section</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredStudents.map((student: any) => {
                        const isSelected = selectedStudents.includes(
                          student.studentId
                        );
                        return (
                          <TableRow
                            key={student.studentId}
                            selected={isSelected}
                            hover={!retaining && !loading}
                            onClick={() =>
                              !retaining &&
                              !loading &&
                              handleSelectStudent(student.studentId)
                            }
                            sx={{
                              cursor:
                                retaining || loading
                                  ? "not-allowed"
                                  : "pointer",
                              opacity: retaining || loading ? 0.6 : 1,
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isSelected}
                                disabled={retaining || loading}
                              />
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight="bold">
                                  {student.studentName}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {student.studentIdentifier}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={student.currentRoll}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <TextField
                                size="small"
                                value={rollNumbers[student.studentId] || ""}
                                onChange={(e) =>
                                  handleRollNumberChange(
                                    student.studentId,
                                    e.target.value
                                  )
                                }
                                placeholder="New Roll"
                                disabled={!isSelected || retaining || loading}
                                sx={{ width: 80 }}
                              />
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <Select
                                value={
                                  sections[student.studentId] ||
                                  student.section ||
                                  "A"
                                }
                                onChange={(e) =>
                                  handleSectionChange(
                                    student.studentId,
                                    e.target.value
                                  )
                                }
                                disabled={!isSelected || retaining || loading}
                                size="small"
                                sx={{ width: 80 }}
                              >
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="B">B</MenuItem>
                                <MenuItem value="C">C</MenuItem>
                              </Select>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          disabled={retaining || loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleRetain}
          variant="contained"
          disabled={retaining || loading || selectedStudents.length === 0}
          color="warning"
        >
          {retaining || loading
            ? "Processing..."
            : `Retain ${selectedStudents.length} Students`}
        </Button>
      </DialogActions>

      {(loading || retaining || isFetching) && <LinearProgress />}
    </Dialog>
  );
};

export default RetainModal;
