/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowForward,
  AttachMoney,
  Cancel,
  CheckCircle,
  Close,
  DateRange,
  Description,
  Edit,
  Email,
  FamilyRestroom,
  History,
  Payment,
  Pending,
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
  enrollment: any; // flattened row with rawData
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

  // Helper to safely get nested student data
  const student = enrollment.student || enrollment.rawData?.student || {};

  // ----- Data extraction helpers -----
  const getValue = (field: string, fallback: any = "N/A") => {
    return enrollment[field] ?? student[field] ?? fallback;
  };

  const getClassName = () => {
    // className can be an array of class objects or a string
    if (
      Array.isArray(enrollment.className) &&
      enrollment.className.length > 0
    ) {
      const first = enrollment.className[0];
      return first.className || first.label || first.name || "N/A";
    }
    if (typeof enrollment.className === "string") return enrollment.className;
    if (enrollment.rawData?.className?.[0]?.className) {
      return enrollment.rawData.className[0].className;
    }
    return "N/A";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  // ----- Fee calculations -----
  const fees = enrollment.fees || [];
  const totalFees = fees.reduce(
    (sum: number, f: any) => sum + (f.amount || 0),
    0,
  );
  const totalPaid = fees.reduce(
    (sum: number, f: any) => sum + (f.paidAmount || 0),
    0,
  );
  const totalDue = fees.reduce(
    (sum: number, f: any) => sum + (f.dueAmount || 0),
    0,
  );
  const totalDiscount = fees.reduce(
    (sum: number, f: any) => sum + (f.discount || 0),
    0,
  );

  const paymentStatus =
    enrollment.paymentStatus ||
    (totalDue === 0 ? "paid" : totalPaid > 0 ? "partial" : "unpaid");

  const getPaymentStatusColor = (
    status: string,
  ): "success" | "warning" | "error" | "default" => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "success";
      case "partial":
        return "warning";
      case "unpaid":
      case "pending":
        return "error";
      default:
        return "default";
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return <CheckCircle fontSize="small" />;
      case "partial":
        return <Pending fontSize="small" />;
      case "unpaid":
      case "pending":
        return <Cancel fontSize="small" />;
      default:
        return undefined;
    }
  };

  // ----- Address display -----
  const formatAddress = (addr: any) => {
    if (!addr || typeof addr !== "object") return "N/A";
    const parts = [
      addr.village,
      addr.postOffice,
      addr.postCode && `-${addr.postCode}`,
      addr.policeStation,
      addr.district,
    ].filter(Boolean);
    return parts.join(", ") || "N/A";
  };

  // ----- Handle close -----
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={enrollment.studentPhoto || student.studentPhoto}
              sx={{ bgcolor: "primary.main", width: 48, height: 48 }}
            >
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6">
                {getValue("studentName", getValue("name", "Unknown"))}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {getValue("studentId")} • Class: {getClassName()}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Tabs
          value={activeTab}
          onChange={(_, v) => onTabChange(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<Person />} label="Personal" />
          <Tab icon={<FamilyRestroom />} label="Family" />
          <Tab icon={<School />} label="Academic" />
          <Tab icon={<Payment />} label="Fees" />
          <Tab icon={<Description />} label="Documents" />
          <Tab icon={<History />} label="History" />
        </Tabs>

        {/* ========== PERSONAL TAB ========== */}
        <TabPanel value={activeTab} index={0}>
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
                      secondary={getValue("studentName", getValue("name"))}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Name (Bangla)"
                      secondary={getValue("nameBangla")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Mobile"
                      secondary={getValue("mobileNo", getValue("mobile"))}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={getValue("email", "N/A")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DateRange fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Date of Birth"
                      secondary={formatDate(getValue("birthDate"))}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Description fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Birth Registration No"
                      secondary={getValue("birthRegistrationNo")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Blood Group"
                      secondary={getValue("bloodGroup")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Nationality"
                      secondary={getValue("nationality", "Bangladeshi")}
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
                      label={getValue("status", "active")}
                      color={
                        getValue("status") === "active" ? "success" : "default"
                      }
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Admission Type
                    </Typography>
                    <Chip
                      label={getValue("admissionType", "admission")}
                      color={
                        getValue("admissionType") === "promotion"
                          ? "success"
                          : "primary"
                      }
                      size="small"
                      sx={{ ml: 1 }}
                      icon={
                        getValue("admissionType") === "promotion" ? (
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
                      label={paymentStatus}
                      color={getPaymentStatusColor(paymentStatus)}
                      icon={getPaymentStatusIcon(paymentStatus)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Student Type
                    </Typography>
                    <Chip
                      label={getValue(
                        "studentType",
                        getValue("category", "Residential"),
                      )}
                      color="info"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Department
                    </Typography>
                    <Chip
                      label={getValue("studentDepartment", "academic")}
                      color="secondary"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* ========== FAMILY TAB ========== */}
        <TabPanel value={activeTab} index={1}>
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
                      secondary={getValue("fatherName")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Name (Bangla)"
                      secondary={getValue("fatherNameBangla")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Mobile"
                      secondary={getValue("fatherMobile")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="NID"
                      secondary={getValue("fatherNid")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Profession"
                      secondary={getValue("fatherProfession")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Income"
                      secondary={`৳${getValue("fatherIncome", 0).toLocaleString()}`}
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
                  Mother Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Name"
                      secondary={getValue("motherName")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Name (Bangla)"
                      secondary={getValue("motherNameBangla")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Mobile"
                      secondary={getValue("motherMobile")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="NID"
                      secondary={getValue("motherNid")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Profession"
                      secondary={getValue("motherProfession")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Income"
                      secondary={`৳${getValue("motherIncome", 0).toLocaleString()}`}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {(enrollment.guardianInfo?.name || student.guardianInfo?.name) && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    color="text.secondary"
                  >
                    Guardian Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Name"
                        secondary={
                          enrollment.guardianInfo?.name ||
                          student.guardianInfo?.name
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Relation"
                        secondary={
                          enrollment.guardianInfo?.relation ||
                          student.guardianInfo?.relation
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Mobile"
                        secondary={
                          enrollment.guardianInfo?.mobile ||
                          student.guardianInfo?.mobile
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Address"
                        secondary={
                          enrollment.guardianInfo?.address ||
                          student.guardianInfo?.address
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        {/* ========== ACADEMIC TAB ========== */}
        <TabPanel value={activeTab} index={2}>
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
                    <ListItemText primary="Class" secondary={getClassName()} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <School fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Department"
                      secondary={getValue("studentDepartment", "academic")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <School fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Student Type"
                      secondary={getValue(
                        "studentType",
                        getValue("category", "Residential"),
                      )}
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
                      secondary={getValue(
                        "rollNumber",
                        getValue("roll", "N/A"),
                      )}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Section"
                      secondary={getValue("section", "N/A")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Session"
                      secondary={getValue("session", "N/A")}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Batch/Group"
                      secondary={getValue("batch", getValue("group", "N/A"))}
                    />
                  </ListItem>
                </List>
              </Grid>

              {enrollment.previousSchool?.institution && (
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    color="text.secondary"
                  >
                    Previous School
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Institution"
                        secondary={enrollment.previousSchool.institution}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Address"
                        secondary={enrollment.previousSchool.address || "N/A"}
                      />
                    </ListItem>
                  </List>
                </Grid>
              )}
            </Grid>
          </Paper>
        </TabPanel>

        {/* ========== FEES TAB ========== */}
        <TabPanel value={activeTab} index={3}>
          <Paper sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h6">Fee Summary</Typography>
              <Chip
                label={`৳${totalPaid.toLocaleString()} / ৳${totalFees.toLocaleString()}`}
                color={getPaymentStatusColor(paymentStatus)}
                icon={<AttachMoney />}
              />
            </Box>

            <Grid container spacing={2} mb={3}>
              {[
                { label: "Total Fees", value: totalFees, color: "primary" },
                { label: "Paid Amount", value: totalPaid, color: "success" },
                { label: "Due Amount", value: totalDue, color: "error" },
                { label: "Discount", value: totalDiscount, color: "warning" },
              ].map((item) => (
                <Grid item xs={6} sm={3} key={item.label}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography variant="h6" color={`${item.color}.main`}>
                      ৳{item.value.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {fees.length > 0 && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Fee Details
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Fee Type</TableCell>
                        <TableCell>Month</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Discount</TableCell>
                        <TableCell align="right">Paid</TableCell>
                        <TableCell align="right">Due</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fees.map((fee: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{fee.feeType || "N/A"}</TableCell>
                          <TableCell>{fee.month || "N/A"}</TableCell>
                          <TableCell align="right">
                            ৳{(fee.amount || 0).toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            ৳{(fee.discount || 0).toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            ৳{(fee.paidAmount || 0).toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            ৳{(fee.dueAmount || 0).toLocaleString()}
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

        {/* ========== DOCUMENTS TAB ========== */}
        <TabPanel value={activeTab} index={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Submitted Documents
            </Typography>
            <Grid container spacing={2}>
              {enrollment.documents &&
                Object.entries(enrollment.documents).map(([doc, submitted]) => (
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
                ))}
              {(!enrollment.documents ||
                Object.keys(enrollment.documents).length === 0) && (
                <Grid item xs={12}>
                  <Typography color="text.secondary" align="center">
                    No documents information available
                  </Typography>
                </Grid>
              )}
            </Grid>

            {/* Address Information */}
            <Box mt={3}>
              <Typography variant="subtitle1" gutterBottom>
                Address Information
              </Typography>
              <Grid container spacing={2}>
                {(enrollment.presentAddress || student.presentAddress) && (
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Present Address
                      </Typography>
                      <Typography variant="body2">
                        {formatAddress(
                          enrollment.presentAddress || student.presentAddress,
                        )}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                {(enrollment.permanentAddress || student.permanentAddress) && (
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Permanent Address
                      </Typography>
                      <Typography variant="body2">
                        {formatAddress(
                          enrollment.permanentAddress ||
                            student.permanentAddress,
                        )}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Paper>
        </TabPanel>

        {/* ========== HISTORY TAB ========== */}
        <TabPanel value={activeTab} index={5}>
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
                  secondary={formatDate(
                    enrollment.createdAt || enrollment.rawData?.createdAt,
                  )}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DateRange />
                </ListItemIcon>
                <ListItemText
                  primary="Last Updated"
                  secondary={formatDate(
                    enrollment.updatedAt || enrollment.rawData?.updatedAt,
                  )}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle
                    color={enrollment.termsAccepted ? "success" : "error"}
                  />
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
        {totalDue > 0 && (
          <Button
            variant="contained"
            color="success"
            startIcon={<AttachMoney />}
            onClick={() => onCollectFee(enrollment)}
          >
            Collect Fee (৳{totalDue.toLocaleString()})
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
