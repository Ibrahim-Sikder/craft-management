/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetPromotionSummaryQuery } from "@/redux/api/promotionApi";
import {
  Assessment,
  Close,
  Error,
  Group,
  School,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

interface PromotionSummaryModalProps {
  open: boolean;
  onClose: () => void;
}

const PromotionSummaryModal: React.FC<PromotionSummaryModalProps> = ({
  open,
  onClose,
}) => {
  const {
    data: summaryData,
    isLoading,
    error,
  } = useGetPromotionSummaryQuery(undefined, {
    skip: !open,
  });

  const summary = summaryData?.data?.summary;
  const classWise = summaryData?.data?.classWisePromotions || [];
  const sessions = summaryData?.data;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Assessment sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6">Promotion Summary</Typography>
          </Box>
          <Button onClick={onClose} startIcon={<Close />} size="small">
            Close
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Box textAlign="center" py={4}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary" mt={2}>
              Loading promotion summary...
            </Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>
            <Typography>Error loading promotion summary</Typography>
            <Typography variant="caption">Please try again later</Typography>
          </Alert>
        ) : !summary ? (
          <Alert severity="info" sx={{ my: 2 }}>
            <Typography>No promotion data available</Typography>
          </Alert>
        ) : (
          <>
            {/* Session Info */}
            <Box mb={3}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Sessions
              </Typography>
              <Box display="flex" gap={2}>
                <Chip
                  label={`Previous: ${sessions?.previousSession || "N/A"}`}
                  color="default"
                  variant="outlined"
                />
                <Chip
                  label={`Current: ${sessions?.currentSession || "N/A"}`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    Previous Enrollments
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {summary.totalPreviousEnrollments}
                  </Typography>
                  <Typography variant="caption">Eligible students</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    Promoted Students
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="success">
                    {summary.totalPromoted}
                  </Typography>
                  <Chip
                    label={summary.promotionRate}
                    size="small"
                    color="success"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    New Admissions
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="info">
                    {summary.totalNewAdmissions}
                  </Typography>
                  <Typography variant="caption">Current session</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    Promotion Rate
                  </Typography>
                  <Box sx={{ width: "100%", mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={parseFloat(summary.promotionRate) || 0}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "success.main",
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 1 }}
                  >
                    {summary.promotionRate}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Class-wise Promotions */}
            {classWise.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Class-wise Promotions
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Class</TableCell>
                        <TableCell align="right">Promoted Students</TableCell>
                        <TableCell>Progress</TableCell>
                        <TableCell align="right">Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classWise.map((row: any) => (
                        <TableRow key={row._id}>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <School fontSize="small" color="action" />
                              <Typography>{row._id || "N/A"}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontWeight="medium">
                              {row.count}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress
                                variant="determinate"
                                value={
                                  (row.count / summary.totalPromoted) * 100
                                }
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: "grey.200",
                                  "& .MuiLinearProgress-bar": {
                                    backgroundColor: "primary.main",
                                    borderRadius: 3,
                                  },
                                }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="text.secondary">
                              {(
                                (row.count / summary.totalPromoted) *
                                100
                              ).toFixed(1)}
                              %
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {/* Insights */}
            <Box mt={3} p={2} bgcolor="background.default" borderRadius={2}>
              <Typography variant="subtitle2" gutterBottom>
                Insights
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {summary.totalPromoted >
                    summary.totalPreviousEnrollments * 0.7 ? (
                      <TrendingUp color="success" />
                    ) : (
                      <TrendingDown color="error" />
                    )}
                    <Typography variant="body2">
                      {summary.totalPromoted >
                      summary.totalPreviousEnrollments * 0.7
                        ? "High promotion rate indicates good academic performance"
                        : "Low promotion rate requires attention"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {summary.totalNewAdmissions > 0 ? (
                      <Group color="info" />
                    ) : (
                      <Error color="warning" />
                    )}
                    <Typography variant="body2">
                      {summary.totalNewAdmissions > 0
                        ? `New admissions: ${summary.totalNewAdmissions} students joined`
                        : "No new admissions this session"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        {summary && (
          <Button
            variant="contained"
            onClick={() => window.print()}
            startIcon={<Assessment />}
          >
            Print Summary
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PromotionSummaryModal;
