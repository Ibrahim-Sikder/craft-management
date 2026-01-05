/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowForward,
  AttachMoney,
  CheckCircle,
  Close,
  DateRange,
  Description,
  Edit,
  FamilyRestroom,
  History,
  Payment,
  Person,
  Phone,
  School,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`enrollment-tabpanel-${index}`}
      aria-labelledby={`enrollment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface EnrollmentDetailsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  enrollment: any;
  activeTab: number;
  onTabChange: (tab: number) => void;
  onEdit: (enrollment: any) => void;
  onCollectFee: (enrollment: any) => void;
}

const EnrollmentDetailsModal: React.FC<EnrollmentDetailsModalProps> = ({
  open,
  setOpen,
  enrollment,
  activeTab,
  onTabChange,
  onEdit,
  onCollectFee,
}) => {
  if (!enrollment) return null;

  const handleClose = () => {
    setOpen(false);
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "partial":
        return "warning";
      case "unpaid":
        return "error";
      default:
        return "default";
    }
  };

  // const getPaymentStatusIcon = (status: string) => {
  //   switch (status) {
  //     case "paid":
  //       return <CheckCircle />;
  //     case "partial":
  //       return <Pending />;
  //     case "unpaid":
  //       return <Cancel />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6">{enrollment.studentName}</Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {enrollment.studentId} • Class: {enrollment.className}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Tabs value={activeTab} onChange={(e, value) => onTabChange(value)}>
          <Tab icon={<Person />} label="Personal" />
          <Tab icon={<FamilyRestroom />} label="Family" />
          <Tab icon={<School />} label="Academic" />
          <Tab icon={<Payment />} label="Fees" />
          <Tab icon={<Description />} label="Documents" />
          <Tab icon={<History />} label="History" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          {/* Personal Information */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Basic Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Full Name"
                      secondary={enrollment.studentName}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Name (Bangla)"
                      secondary={enrollment.studentNameBangla || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Mobile"
                      secondary={enrollment.mobileNo}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DateRange fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Date of Birth"
                      secondary={enrollment.birthDate}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Status & Type
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Enrollment Status
                    </Typography>
                    <Chip
                      label={enrollment.status}
                      color={getPaymentStatusColor(enrollment.status)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Admission Type
                    </Typography>
                    <Chip
                      label={enrollment.admissionType}
                      color={
                        enrollment.admissionType === "promotion"
                          ? "success"
                          : "primary"
                      }
                      size="small"
                      sx={{ ml: 1 }}
                      icon={
                        enrollment.admissionType === "promotion" ? (
                          <ArrowForward />
                        ) : undefined
                      }
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Payment Status
                    </Typography>
                    <Chip
                      label={enrollment.paymentStatus}
                      color={getPaymentStatusColor(enrollment.paymentStatus)}
                      // icon={getPaymentStatusIcon(enrollment.paymentStatus)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {/* Family Information */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Father Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Name"
                      secondary={enrollment.fatherName}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Mobile"
                      secondary={enrollment.fatherMobile || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Profession"
                      secondary={enrollment.fatherProfession || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Income"
                      secondary={`৳${enrollment.fatherIncome?.toLocaleString() || "0"}`}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Mother s Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Name"
                      secondary={enrollment.motherName}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Mobile"
                      secondary={enrollment.motherMobile || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Profession"
                      secondary={enrollment.motherProfession || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Income"
                      secondary={`৳${enrollment.motherIncome?.toLocaleString() || "0"}`}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {/* Academic Information */}
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Class Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <School fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Class"
                      secondary={enrollment.className}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <School fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Department"
                      secondary={enrollment.studentDepartment}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <School fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Student Type"
                      secondary={enrollment.studentType}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Additional Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Roll Number"
                      secondary={enrollment.rollNumber || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Section"
                      secondary={enrollment.section || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Session"
                      secondary={enrollment.session || "N/A"}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          {/* Fees Information */}
          <Paper sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h6">Fee Summary</Typography>
              <Chip
                label={`৳${enrollment.paidAmount.toLocaleString()} / ৳${enrollment.totalFees.toLocaleString()}`}
                color={getPaymentStatusColor(enrollment.paymentStatus)}
                icon={<AttachMoney />}
              />
            </Box>

            <Grid container spacing={2} mb={3}>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    Total Fees
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    ৳{enrollment.totalFees.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    Paid Amount
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    ৳{enrollment.paidAmount.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    Due Amount
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    ৳{enrollment.dueAmount.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    Discount/Waiver
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    ৳
                    {(
                      enrollment.discountAmount + enrollment.waiverAmount
                    ).toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {enrollment.fees && enrollment.fees.length > 0 && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Fee Details
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Fee Type</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Paid</TableCell>
                        <TableCell align="right">Due</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {enrollment.fees.map((fee: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{fee.feeType || "N/A"}</TableCell>
                          <TableCell align="right">
                            ৳{fee.amount?.toLocaleString() || "0"}
                          </TableCell>
                          <TableCell align="right">
                            ৳{fee.paidAmount?.toLocaleString() || "0"}
                          </TableCell>
                          <TableCell align="right">
                            ৳{fee.dueAmount?.toLocaleString() || "0"}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={fee.status || "unpaid"}
                              size="small"
                              color={getPaymentStatusColor(fee.status)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          {/* Documents */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Submitted Documents
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(enrollment.documents || {}).map(
                ([doc, submitted]) => (
                  <Grid item xs={12} sm={6} key={doc}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Description color={submitted ? "success" : "error"} />
                      <Box>
                        <Typography variant="body2">
                          {doc
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </Typography>
                        <Chip
                          label={submitted ? "Submitted" : "Not Submitted"}
                          size="small"
                          color={submitted ? "success" : "error"}
                          variant="outlined"
                        />
                      </Box>
                    </Paper>
                  </Grid>
                )
              )}
            </Grid>
          </Paper>
        </TabPanel>

        <TabPanel value={activeTab} index={5}>
          {/* History */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Enrollment History
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DateRange />
                </ListItemIcon>
                <ListItemText
                  primary="Enrollment Date"
                  secondary={new Date().toLocaleDateString()}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Terms Accepted"
                  secondary={enrollment.termsAccepted ? "Yes" : "No"}
                />
              </ListItem>
              {enrollment.admissionType === "promotion" && (
                <ListItem>
                  <ListItemIcon>
                    <ArrowForward color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Promotion"
                    secondary="This enrollment was created through promotion"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </TabPanel>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
        {enrollment.dueAmount > 0 && (
          <Button
            variant="contained"
            color="success"
            startIcon={<AttachMoney />}
            onClick={() => onCollectFee(enrollment)}
          >
            Collect Fee
          </Button>
        )}
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => onEdit(enrollment)}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnrollmentDetailsModal;
