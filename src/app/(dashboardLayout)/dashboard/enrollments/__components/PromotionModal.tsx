/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useBulkPromoteEnrollmentsMutation,
  useGetPromotionEligibleStudentsQuery,
} from "@/redux/api/promotionApi";
import { Close, School, Search } from "@mui/icons-material";
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
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface PromotionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  classOptions: any;
}

const PromotionModal: React.FC<PromotionModalProps> = ({
  open,
  onClose,
  onSuccess,
  classOptions,
}) => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [sourceClassId, setSourceClassId] = useState<string>("");
  const [targetClassId, setTargetClassId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [rollNumbers, setRollNumbers] = useState<Record<string, string>>({});
  const [sections, setSections] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const [bulkPromote, { isLoading: promoting }] =
    useBulkPromoteEnrollmentsMutation();

  const {
    data: eligibleData,
    isLoading: loadingEligible,
    isFetching,
  } = useGetPromotionEligibleStudentsQuery(sourceClassId, {
    skip: !sourceClassId,
  });

  const getNextClass = (currentClassLabel: string): string => {
    const classOrder = [
      "Hifz",
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
      return "";
    }
    return classOrder[currentIndex + 1];
  };

  useEffect(() => {
    if (sourceClassId) {
      const selectedClass = classOptions.find(
        (c: any) => c.value === sourceClassId
      );
      if (selectedClass) {
        const autoNextClass = getNextClass(selectedClass.label);
        const nextClassOption = classOptions.find(
          (c: any) => c.label === autoNextClass
        );
        setTargetClassId(nextClassOption?.value || "");
      }
    }
  }, [sourceClassId, classOptions]);

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

  const handlePromote = async (event: React.MouseEvent) => {
    event.preventDefault();
    onClose();
    if (selectedStudents.length === 0) {
      Swal.fire(
        "No Selection",
        "Please select students to promote.",
        "warning"
      );
      return;
    }

    if (!targetClassId) {
      Swal.fire(
        "Target Class Required",
        "Please select class to promote students to.",
        "warning"
      );
      return;
    }

    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Confirm Promotion",
        html: `Promote <strong>${selectedStudents.length}</strong> student(s) to target class?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#1976d2",
        confirmButtonText: "Yes, Promote",
        focusCancel: true, // Focus on cancel button by default
        allowOutsideClick: false, // Prevent closing by clicking outside
        allowEscapeKey: false, // Prevent closing by escape key
      });

      if (result.isConfirmed) {
        setLoading(true);

        const promotions = selectedStudents.map((studentId) => {
          const studentData = eligibleData?.data?.students.find(
            (s: any) => s.studentId === studentId
          );

          return {
            studentId: studentData.studentId,
            newClassId: targetClassId,
            rollNumber: rollNumbers[studentId] || studentData.currentRoll || "",
            section: sections[studentId] || studentData.section || "A",
          };
        });

        await bulkPromote(promotions).unwrap();

        await Swal.fire({
          title: "Success!",
          text: "Students promoted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setSelectedStudents([]);
        setRollNumbers({});
        setSections({});
        setSourceClassId("");
        setTargetClassId("");
        setSearchTerm("");
        onClose();
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      console.error("Promotion error:", error);
      Swal.fire({
        title: "Error",
        text: error.data?.message || "Failed to promote students",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
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
    setTargetClassId("");
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">
            Student Promotion (Class Hierarchy)
          </Typography>
          <IconButton onClick={handleClose} disabled={promoting || loading}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* 1. Source & Target Class Selection */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>From Class (Source)</InputLabel>
              <Select
                value={sourceClassId}
                label="From Class (Source)"
                onChange={(e) => setSourceClassId(e.target.value)}
                disabled={promoting || loading}
              >
                {classOptions.map((option: any) => (
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

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>To Class (Target)</InputLabel>
              <Select
                value={targetClassId}
                label="To Class (Target)"
                onChange={(e) => setTargetClassId(e.target.value)}
                disabled={promoting || loading}
              >
                <MenuItem value="">
                  <em>Select Target Class</em>
                </MenuItem>
                {classOptions.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* 2. Alert Box */}
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Select a Source Class to load active students. Then select Target
              Class to promote them to. Session is auto-managed by system.
            </Alert>
          </Grid>

          {/* 3. Search Bar */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search Students"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={!sourceClassId || promoting || loading}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />,
              }}
            />
          </Grid>

          {/* 4. Student Table */}
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
                    Please select a Source Class to begin.
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
                            disabled={promoting || loading}
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
                            hover={!promoting && !loading}
                            onClick={() =>
                              !promoting &&
                              !loading &&
                              handleSelectStudent(student.studentId)
                            }
                            sx={{
                              cursor:
                                promoting || loading
                                  ? "not-allowed"
                                  : "pointer",
                              opacity: promoting || loading ? 0.6 : 1,
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isSelected}
                                disabled={promoting || loading}
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
                                disabled={!isSelected || promoting || loading}
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
                                disabled={!isSelected || promoting || loading}
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
          disabled={promoting || loading}
        >
          Cancel
        </Button>
        <Button
          onClick={(e: any) => handlePromote(e)}
          variant="contained"
          disabled={
            promoting ||
            loading ||
            selectedStudents.length === 0 ||
            !targetClassId
          }
          color="success"
        >
          {promoting || loading
            ? "Promoting..."
            : `Promote ${selectedStudents.length} Students`}
        </Button>
      </DialogActions>

      {(loading || promoting || isFetching) && <LinearProgress />}
    </Dialog>
  );
};

export default PromotionModal;
