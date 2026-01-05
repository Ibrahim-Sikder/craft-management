/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useBulkPromoteEnrollmentsMutation,
  useGetPromotionEligibleStudentsQuery,
} from "@/redux/api/promotionApi";
import {
  ArrowForward,
  Class,
  Close,
  Refresh,
  School,
  Search,
} from "@mui/icons-material";
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
  Divider,
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
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface ClassOption {
  value: string;
  label: string;
}

interface PromotionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  classOptions: ClassOption[];
}

const PromotionModal: React.FC<PromotionModalProps> = ({
  open,
  onClose,
  onSuccess,
  classOptions,
}) => {
  const theme = useTheme();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [session, setSession] = useState<string>("");
  const [newClassId, setNewClassId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [rollNumbers, setRollNumbers] = useState<Record<string, string>>({});
  const [sections, setSections] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");

  // API hooks
  const [bulkPromote, { isLoading: promoting }] =
    useBulkPromoteEnrollmentsMutation();
  const {
    data: eligibleData,
    isLoading: loadingEligible,
    refetch: refetchEligible,
  } = useGetPromotionEligibleStudentsQuery(
    session || new Date().getFullYear().toString()
  );

  // Set default session to next year
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    setSession(`${nextYear}-${nextYear + 1}`);
  }, []);

  // Get next class based on current class
  const getNextClass = (currentClassLabel: string): string => {
    const classOrder = [
      "Play",
      "Nursery",
      "KG",
      "Class I",
      "Class II",
      "Class III",
      "Class IV",
      "Class V",
      "Class VI",
      "Class VII",
      "Class VIII",
      "Class IX",
      "Class X",
      "Class XI",
      "Class XII",
      "Alim First Year",
      "Alim Second Year",
      "Fazil First Year",
      "Fazil Second Year",
      "Fazil Third Year",
      "Kamil First Year",
      "Kamil Second Year",
      "Kamil Third Year",
    ];

    const currentIndex = classOrder.indexOf(currentClassLabel);
    if (currentIndex === -1 || currentIndex === classOrder.length - 1) {
      return currentClassLabel;
    }
    return classOrder[currentIndex + 1];
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const eligibleStudents = eligibleData?.data?.eligibleStudents || [];
      setSelectedStudents(
        eligibleStudents.map((student: any) => student.enrollmentId)
      );
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (enrollmentId: string) => {
    setSelectedStudents((prev) => {
      if (prev.includes(enrollmentId)) {
        return prev.filter((id) => id !== enrollmentId);
      } else {
        return [...prev, enrollmentId];
      }
    });
  };

  const handleRollNumberChange = (studentId: string, value: string) => {
    setRollNumbers((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSectionChange = (studentId: string, value: string) => {
    setSections((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handlePromote = async () => {
    if (selectedStudents.length === 0) {
      Swal.fire({
        title: "No Students Selected",
        text: "Please select at least one student to promote.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (!session) {
      Swal.fire({
        title: "Session Required",
        text: "Please enter the target session.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: "Confirm Promotion",
      html: `You are about to promote <strong>${selectedStudents.length}</strong> student(s) to the next class for session <strong>${session}</strong>. This action cannot be undone.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Promote Students",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);

          // Prepare promotions data
          const promotions = selectedStudents.map((enrollmentId) => {
            const studentData = eligibleData?.data?.eligibleStudents.find(
              (s: any) => s.enrollmentId === enrollmentId
            );

            const currentClass = studentData.currentClass?.className || "";
            const nextClass = newClassId || getNextClass(currentClass);

            // Find class ID from label
            const classOption = classOptions.find((c) => c.label === nextClass);

            return {
              studentId: studentData.studentId,
              newClassId: classOption?.value || newClassId,
              rollNumber:
                rollNumbers[enrollmentId] ||
                studentData.currentRollNumber ||
                "",
              section:
                sections[enrollmentId] || studentData.currentSection || "A",
            };
          });

          // Call bulk promote API
          const response = await bulkPromote({ promotions, session }).unwrap();

          if (response.success) {
            Swal.fire({
              title: "Success!",
              html: `Successfully promoted <strong>${response.results?.length || selectedStudents.length}</strong> student(s).`,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            });

            // Reset form
            setSelectedStudents([]);
            setRollNumbers({});
            setSections({});

            // Trigger success callback
            if (onSuccess) {
              onSuccess();
            }

            // Close modal
            onClose();
          } else {
            Swal.fire({
              title: "Partial Success",
              html: `Promotion completed with some errors.<br/>Successful: ${response.results?.length || 0}<br/>Failed: ${response.errors?.length || 0}`,
              icon: "warning",
              confirmButtonColor: "#3085d6",
            });
          }
        } catch (error: any) {
          console.error("Promotion error:", error);
          Swal.fire({
            title: "Promotion Failed",
            text:
              error.data?.message ||
              error.message ||
              "Failed to promote students",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Filter students based on search term
  const filteredStudents = React.useMemo(() => {
    const students = eligibleData?.data?.eligibleStudents || [];
    if (!searchTerm.trim()) return students;

    const term = searchTerm.toLowerCase();
    return students.filter(
      (student: any) =>
        student.studentName.toLowerCase().includes(term) ||
        student.studentIdentifier.toLowerCase().includes(term) ||
        student.currentClass?.className?.toLowerCase().includes(term)
    );
  }, [eligibleData, searchTerm]);

  const handleClose = () => {
    if (selectedStudents.length > 0) {
      Swal.fire({
        title: "Unsaved Changes",
        text: "You have selected students for promotion. Are you sure you want to close?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Close",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          onClose();
        }
      });
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <ArrowForward sx={{ mr: 1, color: theme.palette.success.main }} />
            <Typography variant="h6">Student Promotion</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Refresh Eligible Students">
              <IconButton
                onClick={() => refetchEligible()}
                size="small"
                disabled={promoting}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
            <IconButton onClick={handleClose} size="small" disabled={promoting}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Header with summary */}
          <Grid item xs={12}>
            <Alert severity="info" icon={<School />} sx={{ mb: 2 }}>
              <Typography variant="body2">
                Select students to promote to next class for the upcoming
                session. This will create new enrollment records with type
                promotion.
              </Typography>
              {eligibleData?.data && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" display="block">
                    Eligible students from session:{" "}
                    <strong>{eligibleData.data.previousSession}</strong>
                  </Typography>
                  <Typography variant="caption" display="block">
                    Total eligible:{" "}
                    <strong>{eligibleData.data.eligibleStudents.length}</strong>{" "}
                    students
                  </Typography>
                </Box>
              )}
            </Alert>
          </Grid>

          {/* Session and Class Controls */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Target Session"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              placeholder="e.g., 2025-2026"
              helperText="Session for which students will be promoted"
              disabled={promoting}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>New Class (for all selected)</InputLabel>
              <Select
                value={newClassId}
                onChange={(e) => setNewClassId(e.target.value)}
                label="New Class"
                disabled={promoting}
              >
                <MenuItem value="">
                  <em>Auto (Individual next class)</em>
                </MenuItem>
                {classOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="textSecondary">
                Leave empty for automatic next class per student
              </Typography>
            </FormControl>
          </Grid>

          {/* Search bar */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search Students"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, or class..."
              disabled={loadingEligible || promoting}
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
          </Grid>

          {/* Eligible Students Table */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ mt: 2 }}>
              <Box sx={{ p: 2, bgcolor: "background.default" }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Eligible Students ({filteredStudents.length})
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      From session:{" "}
                      {eligibleData?.data?.previousSession || "N/A"}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="caption">
                      Selected: {selectedStudents.length} of{" "}
                      {filteredStudents.length}
                    </Typography>
                    <Tooltip title="Select All">
                      <Checkbox
                        indeterminate={
                          selectedStudents.length > 0 &&
                          selectedStudents.length < filteredStudents.length
                        }
                        checked={
                          filteredStudents.length > 0 &&
                          selectedStudents.length === filteredStudents.length
                        }
                        onChange={handleSelectAll}
                        disabled={loadingEligible || promoting}
                      />
                    </Tooltip>
                  </Box>
                </Box>
              </Box>

              <Divider />

              {loadingEligible ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <CircularProgress size={40} />
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Loading eligible students...
                  </Typography>
                </Box>
              ) : filteredStudents.length === 0 ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <School
                    sx={{ fontSize: 60, color: "text.disabled", mb: 2 }}
                  />
                  <Typography variant="body1" color="text.secondary">
                    No eligible students found
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {searchTerm
                      ? "Try a different search term"
                      : "All students from previous session may have been promoted"}
                  </Typography>
                </Box>
              ) : (
                <TableContainer sx={{ maxHeight: 400 }}>
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
                            disabled={promoting}
                          />
                        </TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>Current Class</TableCell>
                        <TableCell>Next Class</TableCell>
                        <TableCell>Session</TableCell>
                        <TableCell>Roll No</TableCell>
                        <TableCell>Section</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredStudents.map((student: any) => {
                        const isSelected = selectedStudents.includes(
                          student.enrollmentId
                        );
                        const currentClass =
                          student.currentClass?.className || "N/A";
                        const nextClass = newClassId
                          ? classOptions.find((c) => c.value === newClassId)
                              ?.label
                          : getNextClass(currentClass);

                        return (
                          <TableRow
                            key={student.enrollmentId}
                            selected={isSelected}
                            hover
                            onClick={() =>
                              !promoting &&
                              handleSelectStudent(student.enrollmentId)
                            }
                            sx={{ cursor: promoting ? "default" : "pointer" }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isSelected}
                                disabled={promoting}
                              />
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight="medium">
                                  {student.studentName}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  ID: {student.studentIdentifier}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={currentClass}
                                size="small"
                                icon={<Class fontSize="small" />}
                                color="primary"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={nextClass}
                                size="small"
                                icon={<ArrowForward fontSize="small" />}
                                color="success"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {student.currentSession}
                              </Typography>
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <TextField
                                size="small"
                                value={
                                  rollNumbers[student.enrollmentId] ||
                                  student.currentRollNumber ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleRollNumberChange(
                                    student.enrollmentId,
                                    e.target.value
                                  )
                                }
                                placeholder="Roll no"
                                disabled={!isSelected || promoting}
                                sx={{ width: 80 }}
                              />
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <FormControl size="small" sx={{ width: 80 }}>
                                <Select
                                  value={
                                    sections[student.enrollmentId] ||
                                    student.currentSection ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleSectionChange(
                                      student.enrollmentId,
                                      e.target.value
                                    )
                                  }
                                  disabled={!isSelected || promoting}
                                >
                                  <MenuItem value="A">A</MenuItem>
                                  <MenuItem value="B">B</MenuItem>
                                  <MenuItem value="C">C</MenuItem>
                                </Select>
                              </FormControl>
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

          {/* Loading Progress */}
          {(loading || promoting) && (
            <Grid item xs={12}>
              <LinearProgress />
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1, textAlign: "center" }}
              >
                {promoting ? "Promoting students..." : "Processing..."}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} variant="outlined" disabled={promoting}>
          Cancel
        </Button>
        <Button
          onClick={handlePromote}
          variant="contained"
          disabled={
            promoting || selectedStudents.length === 0 || loadingEligible
          }
          startIcon={
            promoting ? <CircularProgress size={20} /> : <ArrowForward />
          }
          color="success"
        >
          {promoting
            ? "Promoting..."
            : `Promote ${selectedStudents.length} Student(s)`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromotionModal;
