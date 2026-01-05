/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Avatar,
  Paper,
} from "@mui/material";
import { Close, School, ArrowForward, Person } from "@mui/icons-material";
import { useGetPromotionHistoryQuery } from "@/redux/api/promotionApi";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

interface PromotionHistoryModalProps {
  open: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
}

const PromotionHistoryModal: React.FC<PromotionHistoryModalProps> = ({
  open,
  onClose,
  studentId,
  studentName,
}) => {
  const { data: historyData, isLoading } = useGetPromotionHistoryQuery(
    studentId,
    {
      skip: !studentId || !open,
    }
  );

  const history = historyData?.data || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <School sx={{ mr: 1 }} />
            <Typography variant="h6">
              Promotion History: {studentName}
            </Typography>
          </Box>
          <Button onClick={onClose} startIcon={<Close />} size="small">
            Close
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Box textAlign="center" py={4}>
            <Typography>Loading history...</Typography>
          </Box>
        ) : history.length === 0 ? (
          <Box textAlign="center" py={4}>
            <School sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
            <Typography color="text.secondary">
              No promotion history found
            </Typography>
          </Box>
        ) : (
          <Timeline position="alternate">
            {history.map((item: any, index: number) => (
              <TimelineItem key={item.id}>
                <TimelineOppositeContent sx={{ m: "auto 0" }}>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    Session: {item.session}
                  </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot
                    color={
                      item.admissionType === "promotion" ? "success" : "primary"
                    }
                  >
                    {item.admissionType === "promotion" ? (
                      <ArrowForward />
                    ) : (
                      <Person />
                    )}
                  </TimelineDot>
                  {index < history.length - 1 && <TimelineConnector />}
                </TimelineSeparator>

                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Avatar sx={{ width: 24, height: 24 }}>
                        <School fontSize="small" />
                      </Avatar>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {typeof item.class === "object"
                          ? item.class.className
                          : item.class}
                      </Typography>
                    </Box>

                    <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
                      <Chip
                        label={item.admissionType}
                        color={
                          item.admissionType === "promotion"
                            ? "success"
                            : "primary"
                        }
                        size="small"
                      />
                      <Chip
                        label={item.status}
                        color={
                          item.status === "active"
                            ? "success"
                            : item.status === "passed"
                              ? "info"
                              : "default"
                        }
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      Roll: {item.rollNumber || "N/A"}
                    </Typography>

                    {item.promotedFrom && (
                      <Typography variant="caption" color="text.secondary">
                        Promoted from previous enrollment
                      </Typography>
                    )}
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromotionHistoryModal;
