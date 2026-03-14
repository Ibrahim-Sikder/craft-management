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

  console.log("enrollment details check", enrollment);

  const handleClose = () => {
    setOpen(false);
  };

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

  const getPaymentStatusIcon = (
    status: string,
  ): React.ReactElement | undefined => {
    switch (status?.toLowerCase()) {
      case "paid":
        return <CheckCircle />;
      case "partial":
        return <Pending />;
      case "unpaid":
      case "pending":
        return <Cancel />;
      default:
        return undefined; // Return undefined instead of null
    }
  };

  // Calculate total fees from fees array
  const calculateTotalFees = () => {
    if (!enrollment.fees || !Array.isArray(enrollment.fees)) return 0;
    return enrollment.fees.reduce(
      (sum: number, fee: any) => sum + (fee.amount || 0),
      0,
    );
  };

  // Calculate total paid from fees array
  const calculateTotalPaid = () => {
    if (!enrollment.fees || !Array.isArray(enrollment.fees))
      return enrollment.paidAmount || 0;
    return enrollment.fees.reduce(
      (sum: number, fee: any) => sum + (fee.paidAmount || 0),
      0,
    );
  };

  // Calculate total due from fees array
  const calculateTotalDue = () => {
    if (!enrollment.fees || !Array.isArray(enrollment.fees))
      return enrollment.dueAmount || 0;
    return enrollment.fees.reduce(
      (sum: number, fee: any) => sum + (fee.dueAmount || 0),
      0,
    );
  };

  // Calculate total discount from fees array
  const calculateTotalDiscount = () => {
    if (!enrollment.fees || !Array.isArray(enrollment.fees))
      return enrollment.totalDiscount || 0;
    return enrollment.fees.reduce(
      (sum: number, fee: any) => sum + (fee.discount || 0),
      0,
    );
  };

  const totalFees = calculateTotalFees();
  const totalPaid = calculateTotalPaid();
  const totalDue = calculateTotalDue();
  const totalDiscount = calculateTotalDiscount();

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  // Get class name
  const getClassName = () => {
    if (enrollment.className) {
      if (
        typeof enrollment.className === "object" &&
        enrollment.className.className
      ) {
        return enrollment.className.className;
      }
      if (typeof enrollment.className === "string") {
        return enrollment.className;
      }
    }
    if (enrollment.rawData?.className?.[0]?.label) {
      return enrollment.rawData.className[0].label;
    }
    return "N/A";
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6">
                {enrollment.studentName || enrollment.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {enrollment.studentId} • Class: {getClassName()}
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
                      secondary={
                        enrollment.studentName || enrollment.name || "N/A"
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Name (Bangla)"
                      secondary={
                        enrollment.nameBangla ||
                        enrollment.studentNameBangla ||
                        "N/A"
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Mobile"
                      secondary={
                        enrollment.mobileNo || enrollment.mobile || "N/A"
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DateRange fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Date of Birth"
                      secondary={formatDate(
                        enrollment.birthDate || enrollment.rawData?.birthDate,
                      )}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Description fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Birth Registration No"
                      secondary={enrollment.birthRegistrationNo || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Blood Group"
                      secondary={enrollment.bloodGroup || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Nationality"
                      secondary={enrollment.nationality || "Bangladeshi"}
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
                      label={enrollment.status || "active"}
                      color={
                        enrollment.status === "active" ? "success" : "default"
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
                      label={enrollment.admissionType || "admission"}
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
                      label={enrollment.paymentStatus || "pending"}
                      color={getPaymentStatusColor(enrollment.paymentStatus)}
                      icon={getPaymentStatusIcon(enrollment.paymentStatus)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Student Type
                    </Typography>
                    <Chip
                      label={
                        enrollment.studentType ||
                        enrollment.category ||
                        "Residential"
                      }
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
                      label={enrollment.studentDepartment || "academic"}
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
                      secondary={enrollment.fatherName || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Name (Bangla)"
                      secondary={enrollment.fatherNameBangla || "N/A"}
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
                      primary="NID"
                      secondary={enrollment.fatherNid || "N/A"}
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
                  Mother Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Name"
                      secondary={enrollment.motherName || "N/A"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Name (Bangla)"
                      secondary={enrollment.motherNameBangla || "N/A"}
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
                      primary="NID"
                      secondary={enrollment.motherNid || "N/A"}
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

            {(enrollment.guardianInfo?.name ||
              enrollment.guardianInfo?.relation) && (
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
                    {enrollment.guardianInfo?.name && (
                      <ListItem>
                        <ListItemText
                          primary="Name"
                          secondary={enrollment.guardianInfo.name}
                        />
                      </ListItem>
                    )}
                    {enrollment.guardianInfo?.relation && (
                      <ListItem>
                        <ListItemText
                          primary="Relation"
                          secondary={enrollment.guardianInfo.relation}
                        />
                      </ListItem>
                    )}
                    {enrollment.guardianInfo?.mobile && (
                      <ListItem>
                        <ListItemText
                          primary="Mobile"
                          secondary={enrollment.guardianInfo.mobile}
                        />
                      </ListItem>
                    )}
                    {enrollment.guardianInfo?.address && (
                      <ListItem>
                        <ListItemText
                          primary="Address"
                          secondary={enrollment.guardianInfo.address}
                        />
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </Grid>
            )}
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
                    <ListItemText primary="Class" secondary={getClassName()} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <School fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Department"
                      secondary={enrollment.studentDepartment || "academic"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <School fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Student Type"
                      secondary={
                        enrollment.studentType ||
                        enrollment.category ||
                        "Residential"
                      }
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
                      secondary={
                        enrollment.rollNumber || enrollment.roll || "N/A"
                      }
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
                  <ListItem>
                    <ListItemText
                      primary="Batch/Group"
                      secondary={enrollment.batch || enrollment.group || "N/A"}
                    />
                  </ListItem>
                </List>
              </Grid>

              {enrollment.previousSchool && (
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
                        secondary={
                          enrollment.previousSchool.institution || "N/A"
                        }
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
                label={`৳${totalPaid.toLocaleString()} / ৳${totalFees.toLocaleString()}`}
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
                    ৳{totalFees.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    Paid Amount
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    ৳{totalPaid.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    Due Amount
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    ৳{totalDue.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    Discount
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    ৳{totalDiscount.toLocaleString()}
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
                        <TableCell>Month</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Discount</TableCell>
                        <TableCell align="right">Paid</TableCell>
                        <TableCell align="right">Due</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {enrollment.fees.map((fee: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{fee.feeType || "N/A"}</TableCell>
                          <TableCell>{fee.month || "N/A"}</TableCell>
                          <TableCell align="right">
                            ৳{fee.amount?.toLocaleString() || "0"}
                          </TableCell>
                          <TableCell align="right">
                            ৳{fee.discount?.toLocaleString() || "0"}
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
                {enrollment.presentAddress && (
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Present Address
                      </Typography>
                      <Typography variant="body2">
                        {enrollment.presentAddress.village &&
                          `Village: ${enrollment.presentAddress.village}`}
                        {enrollment.presentAddress.postOffice &&
                          `, Post: ${enrollment.presentAddress.postOffice}`}
                        {enrollment.presentAddress.postCode &&
                          `-${enrollment.presentAddress.postCode}`}
                      </Typography>
                      <Typography variant="body2">
                        {enrollment.presentAddress.policeStation &&
                          `Thana: ${enrollment.presentAddress.policeStation}`}
                        {enrollment.presentAddress.district &&
                          `, District: ${enrollment.presentAddress.district}`}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                {enrollment.permanentAddress && (
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Permanent Address
                      </Typography>
                      <Typography variant="body2">
                        {enrollment.permanentAddress.village &&
                          `Village: ${enrollment.permanentAddress.village}`}
                        {enrollment.permanentAddress.postOffice &&
                          `, Post: ${enrollment.permanentAddress.postOffice}`}
                        {enrollment.permanentAddress.postCode &&
                          `-${enrollment.permanentAddress.postCode}`}
                      </Typography>
                      <Typography variant="body2">
                        {enrollment.permanentAddress.policeStation &&
                          `Thana: ${enrollment.permanentAddress.policeStation}`}
                        {enrollment.permanentAddress.district &&
                          `, District: ${enrollment.permanentAddress.district}`}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
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
